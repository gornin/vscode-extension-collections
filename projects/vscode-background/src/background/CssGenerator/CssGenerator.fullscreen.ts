import { AbsCssGenerator, css } from './CssGenerator.base';

/**
 * 全屏配置
 *
 * @export
 * @class FullScreenGeneratorOptions
 */
export class FullScreenGeneratorOptions {
    image = '' as string | string[];
    opacity = 0.91; // 建议在 0.85 ~ 0.95 之间微调
    size = 'cover' as 'cover' | 'contain';
    position = 'center';
    interval = 0;
}

/**
 * 全屏样式生成
 *
 * @export
 * @class FullScreenCssGenerator
 * @extends {AbsCssGenerator<FullScreenGeneratorOptions>}
 */
export class FullScreenCssGenerator extends AbsCssGenerator<FullScreenGeneratorOptions> {
    private getCarouselCss(images: string[], interval: number) {
        const animationName = 'background-fullscreen-carousel';
        const keyframeCSS = this.createKeyFrames(images, interval, animationName);

        if (!keyframeCSS) {
            return '';
        }

        return css`
            body {
                animation: ${animationName} ${images.length * interval}s infinite;
            }
            ${keyframeCSS}
        `;
    }

    protected async getCss(options: FullScreenGeneratorOptions) {
        const { size, position, opacity, image, interval } = {
            ...new FullScreenGeneratorOptions(),
            ...options
        };

        // ------ 处理图片 ------
        const images = this.normalizeImageUrls(Array.isArray(image) ? image : [image]);

        return css`
            body {
                background-size: ${size};
                background-repeat: no-repeat;
                background-attachment: fixed; // 兼容 code-server，其他的不影响
                background-position: ${position};
                opacity: ${opacity};
                background-image: url('${images[0]}');
            }
            ${this.getCarouselCss(images, interval)}
        `;
    }
}
