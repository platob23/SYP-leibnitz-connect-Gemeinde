type FiltersProps = {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (cat: string | null) => void;
    dates: string[];
    selectedDate: string | null;
    onSelectDate: (date: string | null) => void;
};

export default function Filters({
                                    categories,
                                    selectedCategory,
                                    onSelectCategory,
                                    dates,
                                    selectedDate,
                                    onSelectDate,
                                }: FiltersProps) {
    return (
        <div className="filters">
            <select
                value={selectedCategory || ""}
                onChange={(e) =>
                    onSelectCategory(e.target.value || null)
                }
            >
                <option value="">Kategorie</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <select
                value={selectedDate || ""}
                onChange={(e) => onSelectDate(e.target.value || null)}
            >
                <option value="">Datum</option>
                {dates.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>
        </div>
    );
}
