export type Rotation = 0 | 90 | 180 | 270;

export interface CropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageEditSettings {
  crop: CropRegion;
  flipHorizontal: boolean;
  flipVertical: boolean;
  rotation: Rotation;
}

export function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read this image."));
    image.src = source;
  });
}

export function renderEditedImage(canvas: HTMLCanvasElement, image: HTMLImageElement, settings: ImageEditSettings, fillBackground = false) {
  const { crop, flipHorizontal, flipVertical, rotation } = settings;
  const turnsSideways = rotation === 90 || rotation === 270;
  canvas.width = turnsSideways ? crop.height : crop.width;
  canvas.height = turnsSideways ? crop.width : crop.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser does not support image editing.");

  if (fillBackground) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((rotation * Math.PI) / 180);
  context.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
  context.drawImage(image, crop.x, crop.y, crop.width, crop.height, -crop.width / 2, -crop.height / 2, crop.width, crop.height);
  context.restore();
}
