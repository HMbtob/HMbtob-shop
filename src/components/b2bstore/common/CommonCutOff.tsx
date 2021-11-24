export function CommonCutOff() {
  return (
    <div className="w-full flex justify-end text-xs">
      <select className="bg-transparent">
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      개씩 보기
    </div>
  );
}
