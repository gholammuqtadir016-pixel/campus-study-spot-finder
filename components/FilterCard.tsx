interface FilterCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FilterCard({
  icon,
  title,
  description,
}: FilterCardProps) {
  return (
    <button className="p-5 bg-white rounded-xl border hover:border-blue-500 hover:shadow-sm text-left transition w-full">
      <div className="text-2xl mb-2">{icon}</div>

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        {description}
      </p>
    </button>
  );
}