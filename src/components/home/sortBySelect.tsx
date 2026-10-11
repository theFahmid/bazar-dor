export type SortKey = "default" | "asc" | "desc";

export default function SortBySelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Sort by</legend>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="select"
      >
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </fieldset>
  );
}
