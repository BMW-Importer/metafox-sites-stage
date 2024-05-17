export default function decorate(block) {
  // get the first and only cell from each row
  const props = [...block.children].map((row) => row.firstElementChild);
  const [downloadlink, downloadtext] = props;
  console.log(downloadlink, downloadtext);
  console.log(block);
}
