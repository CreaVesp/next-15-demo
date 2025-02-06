// This is a helper function to define and reuse paths across the app.
// It's useful if our global path is changed, so we don't have to change all the links across entire project.
const paths = {
    home() {
        return '/'
    },
    topicShow(slug: string) {
        return `/topics/${slug}`
    },
    postCreate(slug: string) {
        return `/topics/${slug}/posts/new`
    },
    postShow(slug: string, postId: string) {
        return `/topics/${slug}/posts/${postId}`
    }
}

export default paths