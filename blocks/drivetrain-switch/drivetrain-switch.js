export default function decorate(block) {
    const [
        detailCell,
        technicalDetail1Cell,
        technicalDetail2Cell,
        analyticsCell,
        ...rows
      ] = [...block.children].map((row, index) => {
        if (index < 4) return row.firstElementChild
        else return [...row.children]
      });
}