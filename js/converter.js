export function getEmbedHtml(videoId) {
    return `<iframe src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" allowfullscreen></iframe>`;
}

export function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
