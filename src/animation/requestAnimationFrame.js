export default (
    typeof window !== 'undefined'
    && (
        (window.requestAnimationFrame && window.requestAnimationFrame.bind(window))
        || (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window))
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
    )
) || function (callback) {
    setTimeout(callback, 16);
};