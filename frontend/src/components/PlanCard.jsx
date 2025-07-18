export default function PlanCard({ title, content }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="whitespace-pre-line text-gray-800">{content}</p>
    </div>
  );
}
