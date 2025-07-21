import { Materias } from "@/store/features/materias/useMateriasStore";

const SelectMateria = ({ data }: { data: Materias }) => {
  return (
    <div
      className={"flex flex-col gap-4 w-full bg-[var(--second)] p-5 rounded-md"}
    >
      <div className={"flex justify-between gap-4"}>
        <div>
          <h2 className={"text-2xl text-white"}>{data.name}</h2>
          <p className={"text-sm"}>{data.teacher}</p>
        </div>

        <div>
          <p className={"text-white"}>Nota</p>
          <p
            className={`${data.rating <= 6 ? "text-red-600" : "text-green-600"}`}
          >
            {data.rating}
          </p>
        </div>
      </div>

      <p className={"text-white"}>Parabéns! Você já passou nessa matéria</p>
    </div>
  );
};

export default SelectMateria;
