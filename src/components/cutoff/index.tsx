export function CutOff({ setItemsPerPage }: any) {
  return (
    <div className="w-full flex justify-end text-sm items-center">
      Per Page
      <select
        onChange={(e) => setItemsPerPage(e.target.value)}
        className="bg-transparent outline-none border m-1">
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}
