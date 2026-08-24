const VIEWPORT_WIDTH = 320;
const VIEWPORT_HEIGHT = 180;
const TILE_SIZE = 16;
const HOE_TARGET_OFFSET_X = -12;

type FarmLayer = {
  source: 'ground' | 'props';
  originX: number;
  originY: number;
  offsetX: number;
  offsetY: number;
  atlasY: number;
  rows: string[];
  ground?: boolean;
};

const layers: FarmLayer[] = [
  {
    source: 'ground',
    originX: -12,
    originY: -9,
    offsetX: 0,
    offsetY: 0,
    atlasY: 1,
    rows: [
      '10111100110110001001011111',
      '10001010010110111000001110',
      '01011111101000101100000101',
      '11110101100000010000011000',
      '11110110000001001001111101',
      '10011111000100111111100001',
      '00101000101010001100100000',
      '10111011111010010100110000',
      '10010111101001100010011100',
      '11010000011011110001111100',
      '11011010111100101110111011',
      '10100100111100001100010100',
      '01100001100111000000010011',
      '11000011101110111010101011',
      '10101101100110001101001111',
      '11000010101100110111010010',
    ],
  },
  {
    source: 'ground',
    originX: -4,
    originY: -4,
    offsetX: -46,
    offsetY: -27,
    atlasY: 0,
    rows: [
      '.4444444444444.',
      '311010011111012',
      '300011010100112',
      '300101111110012',
      '301000001010112',
      '301001001101012',
      '311100111100002',
      '301010000100102',
      '311101011111102',
      '311110010101112',
      '.5555555555555.',
    ],
  },
  {
    source: 'ground',
    originX: -4,
    originY: -4,
    offsetX: 0,
    offsetY: 0,
    atlasY: 2,
    ground: true,
    rows: [
      '.33333....',
      '200000533.',
      '2000000001',
      '.448000001',
      '...2000001',
      '...2000001',
      '....44444.',
    ],
  },
  {
    source: 'props',
    originX: -6,
    originY: -5,
    offsetX: 0,
    offsetY: 0,
    atlasY: 0,
    rows: [
      '5333333333336',
      '1...........1',
      '1...........1',
      '1...........1',
      '1...........1',
      '1...........1',
      '1...........1',
      '1...........1',
      '2333333333334',
    ],
  },
];

const farmFields = document.querySelectorAll<HTMLElement>('farm-field');

farmFields.forEach((root) => {
  const stage = root.querySelector<HTMLButtonElement>('[data-farm-stage]');
  const canvas = root.querySelector<HTMLCanvasElement>('[data-farm-canvas]');
  const cursor = root.querySelector<HTMLElement>('[data-farm-cursor]');
  const groundImage = root.querySelector<HTMLImageElement>('[data-farm-ground]');
  const propsImage = root.querySelector<HTMLImageElement>('[data-farm-props]');

  if (
    !stage ||
    !canvas ||
    !cursor ||
    !groundImage ||
    !propsImage ||
    root.dataset.bound === 'true'
  ) {
    return;
  }
  root.dataset.bound = 'true';

  const context = canvas.getContext('2d');
  if (!context) return;

  const prepared = new Set<string>();
  let ready = false;
  let loading: Promise<void> | undefined;
  let audioContext: AudioContext | undefined;
  let keyboardCell = { x: 0, y: 0 };

  const key = (x: number, y: number) => `${x},${y}`;

  const ensureAudioContext = () => {
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;

    audioContext ??= new AudioContextConstructor();
    if (audioContext.state === 'suspended') void audioContext.resume();
    return audioContext;
  };

  const playInteractionSound = (accepted: boolean) => {
    const sound = ensureAudioContext();
    if (!sound) return;
    root.dataset.lastSound = accepted ? 'thock' : 'denied';

    const now = sound.currentTime;
    const output = sound.createGain();
    output.gain.setValueAtTime(0.0001, now);
    output.connect(sound.destination);

    if (accepted) {
      const oscillator = sound.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.exponentialRampToValueAtTime(64, now + 0.11);
      oscillator.connect(output);
      output.gain.exponentialRampToValueAtTime(0.16, now + 0.004);
      output.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      oscillator.start(now);
      oscillator.stop(now + 0.12);
      return;
    }

    const firstTone = sound.createOscillator();
    const secondTone = sound.createOscillator();
    firstTone.type = 'triangle';
    secondTone.type = 'triangle';
    firstTone.frequency.setValueAtTime(190, now);
    secondTone.frequency.setValueAtTime(142, now + 0.09);
    firstTone.connect(output);
    secondTone.connect(output);
    output.gain.exponentialRampToValueAtTime(0.075, now + 0.004);
    output.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    output.gain.setValueAtTime(0.0001, now + 0.085);
    output.gain.exponentialRampToValueAtTime(0.075, now + 0.095);
    output.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
    firstTone.start(now);
    firstTone.stop(now + 0.08);
    secondTone.start(now + 0.085);
    secondTone.stop(now + 0.2);
  };

  const imageReady = (image: HTMLImageElement) => {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener('error', () => reject(new Error('Farm asset failed to load.')), {
        once: true,
      });
    });
  };

  const isArable = (x: number, y: number) => {
    const ground = layers.find((layer) => layer.ground);
    if (!ground) return false;
    const row = ground.rows[y - ground.originY];
    return row?.[x - ground.originX] === '0';
  };

  const render = () => {
    context.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    context.imageSmoothingEnabled = false;

    for (const layer of layers) {
      const image = layer.source === 'ground' ? groundImage : propsImage;

      layer.rows.forEach((row, rowIndex) => {
        for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
          const value = row[columnIndex];
          if (!value || value === '.') continue;

          const cellX = layer.originX + columnIndex;
          const cellY = layer.originY + rowIndex;
          const isPrepared = layer.ground && prepared.has(key(cellX, cellY));
          const atlasX = isPrepared ? 0 : Number.parseInt(value, 16);
          const atlasY = isPrepared ? 3 : layer.atlasY;
          const destinationX = VIEWPORT_WIDTH / 2 + layer.offsetX + cellX * TILE_SIZE;
          const destinationY = VIEWPORT_HEIGHT / 2 + layer.offsetY + cellY * TILE_SIZE;

          context.drawImage(
            image,
            atlasX * TILE_SIZE,
            atlasY * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE,
            destinationX,
            destinationY,
            TILE_SIZE,
            TILE_SIZE,
          );
        }
      });
    }
  };

  const initialise = () => {
    if (ready) return Promise.resolve();
    if (loading) return loading;

    loading = Promise.all([imageReady(groundImage), imageReady(propsImage)])
      .then(() => {
        render();
        ready = true;
        root.dataset.ready = 'true';
      })
      .catch(() => {
        loading = undefined;
      });

    return loading;
  };

  const showCursor = (x: number, y: number) => {
    cursor.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    root.dataset.cursor = 'true';
  };

  const positionFromPointer = (event: PointerEvent) => {
    const bounds = stage.getBoundingClientRect();
    const localX = Math.min(bounds.width, Math.max(0, event.clientX - bounds.left));
    const localY = Math.min(bounds.height, Math.max(0, event.clientY - bounds.top));
    const sceneX = (localX / bounds.width) * VIEWPORT_WIDTH;
    const sceneY = (localY / bounds.height) * VIEWPORT_HEIGHT;

    return {
      localX,
      localY,
      cellX: Math.floor(
        (sceneX - VIEWPORT_WIDTH / 2 + HOE_TARGET_OFFSET_X) / TILE_SIZE,
      ),
      cellY: Math.floor((sceneY - VIEWPORT_HEIGHT / 2) / TILE_SIZE),
    };
  };

  const positionCursorAtCell = () => {
    const bounds = stage.getBoundingClientRect();
    const sceneX = VIEWPORT_WIDTH / 2 + keyboardCell.x * TILE_SIZE + TILE_SIZE / 2;
    const sceneY = VIEWPORT_HEIGHT / 2 + keyboardCell.y * TILE_SIZE + TILE_SIZE / 2;
    showCursor(
      (sceneX / VIEWPORT_WIDTH) * bounds.width,
      (sceneY / VIEWPORT_HEIGHT) * bounds.height,
    );
  };

  const prepareCell = (x: number, y: number) => {
    if (!ready || !isArable(x, y) || prepared.has(key(x, y))) return false;
    prepared.add(key(x, y));
    root.dataset.preparedCount = String(prepared.size);
    render();
    return true;
  };

  stage.addEventListener('pointerenter', (event) => {
    void initialise();
    const position = positionFromPointer(event);
    showCursor(position.localX, position.localY);
  });

  stage.addEventListener('pointermove', (event) => {
    const position = positionFromPointer(event);
    showCursor(position.localX, position.localY);
  });

  stage.addEventListener('pointerleave', () => {
    root.removeAttribute('data-cursor');
    root.removeAttribute('data-working');
  });

  stage.addEventListener('pointerdown', async (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    ensureAudioContext();
    await initialise();
    const position = positionFromPointer(event);
    showCursor(position.localX, position.localY);
    root.dataset.working = 'true';
    playInteractionSound(prepareCell(position.cellX, position.cellY));
    stage.setPointerCapture(event.pointerId);
  });

  const releaseTool = (event: PointerEvent) => {
    root.removeAttribute('data-working');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  };

  stage.addEventListener('pointerup', releaseTool);
  stage.addEventListener('pointercancel', releaseTool);

  stage.addEventListener('focus', () => {
    void initialise();
    positionCursorAtCell();
  });

  stage.addEventListener('blur', () => {
    root.removeAttribute('data-cursor');
    root.removeAttribute('data-working');
  });

  stage.addEventListener('keydown', async (event) => {
    const movement = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }[event.key];

    if (movement) {
      event.preventDefault();
      keyboardCell = {
        x: Math.min(5, Math.max(-4, keyboardCell.x + movement[0]!)),
        y: Math.min(2, Math.max(-4, keyboardCell.y + movement[1]!)),
      };
      positionCursorAtCell();
      return;
    }

    if ((event.key !== ' ' && event.key !== 'Enter') || event.repeat) return;
    event.preventDefault();
    ensureAudioContext();
    await initialise();
    root.dataset.working = 'true';
    playInteractionSound(
      prepareCell(
        Math.floor(
          (keyboardCell.x * TILE_SIZE + TILE_SIZE / 2 + HOE_TARGET_OFFSET_X) /
            TILE_SIZE,
        ),
        keyboardCell.y,
      ),
    );
  });

  stage.addEventListener('keyup', (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    root.removeAttribute('data-working');
  });

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const constrained = connection?.saveData || connection?.effectiveType === '2g';
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      void initialise();
      observer.disconnect();
    },
    { rootMargin: constrained ? '0px' : '200px 0px' },
  );
  observer.observe(root);
});
