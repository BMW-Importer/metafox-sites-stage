export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [contentfragment] = props;
  console.log(contentfragment);
}
