/**
 * 部署路径的唯一来源。
 *
 * 这里是 GitHub Pages 的「项目站」：
 *   https://dandeshuitaleng-png.github.io/personal-site/
 * 所有资源都挂在 /personal-site/ 子路径下。
 *
 * next.config.ts 和 image-loader.ts 都从这里读，避免两处写死后不一致。
 * 如果以后换成用户主页站（用户名.github.io）或绑了自定义域名，
 * 把这里改成 "" 即可。
 */
export const BASE_PATH = "/personal-site";
