module.exports = {
    title: "Vugel",
    description: "WebGL for Vue3",
    plugins: [
        "@vuepress/active-header-links",
        "@vuepress/back-to-top",
        "@vuepress/last-updated",
        "@vuepress/medium-zoom",
        "@vuepress/search"
    ],
    themeConfig: {
        displayAllHeaders: true,
        repo: "Planning-nl/vugel",
        docsDir: "docs",
        docsRepo: "Planning-nl/vugel-docs",
        editLinks: true,
    }
}
