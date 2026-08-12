import { MdChevronLeft } from "react-icons/md";
import type { NewPatient } from "../../lib/mockData";

type Props = {
  patients: NewPatient[];
};

export default function NewPatientsTable({ patients }: Props) {
  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <button className="flex items-center gap-1 text-sm ds-text-secondary hover:opacity-70">
          <MdChevronLeft size={16} />
          عرض الكل
        </button>
        <h3 className="text-lg font-bold ds-text">المرضى الجدد</h3>
      </div>
      <p className="mb-4 text-end text-sm ds-text-secondary">
        آخر المسجلين
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="ds-bg-button-primary text-white">
              <th className="rounded-e-lg px-4 py-3 text-start font-medium">
                المريض
              </th>
              <th className="px-4 py-3 text-start font-medium">العمر</th>
              <th className="px-4 py-3 text-start font-medium">الأعراض</th>
              <th className="rounded-s-lg px-4 py-3 text-start font-medium">
                التاريخ
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b ds-border-gray">
                <td className="px-4 py-3 ds-text">{patient.name}</td>
                <td className="px-4 py-3 ds-text-secondary">
                  {patient.age} سنه
                </td>
                <td className="px-4 py-3 ds-text-secondary">
                  {patient.symptoms}
                </td>
                <td className="px-4 py-3 ds-text-secondary">
                  {patient.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
