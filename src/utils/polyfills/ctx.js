
if (!CanvasRenderingContext2D.prototype.traceText) {
    CanvasRenderingContext2D.prototype.traceText = function* () {
        const textWidth = this.measureText(text).width,
            textHeight = parseInt(ctx.font) * 1.2;
        // Get pixel data of the canvas
        const imageData = this.getImageData(0, 0, textWidth, textHeight);

        // Iterate through each pixel and yield the 
        // coordinate of non-transparent pixels
        for (let x = 0; x < textWidth; x++) {
            for (let y = 0; y < textHeight; y++) {
                const index = (y * textWidth + x) * 4;
                if (imageData.data[index + 3] !== 0) {
                    yield [x, y];
                }
            }
        }
    }
}