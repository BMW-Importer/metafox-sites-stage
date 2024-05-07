export default function decorate(block) {
  const [general, media] = block.children;
  general.className = 'general';
  media.className = 'media';
}
