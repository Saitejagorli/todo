//formatting the date into the format "DD/MM/YYYY"
const format_Date = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate; // Output: "30/12/2024"
};

const Taskcard = ({
  onClick,
  name,
  startDate,
  deadline,
  status,
  textColor,
  bgColor,
}) => {
  return (
    <div
      className="h-[114] w-[270px] shadow-custom-blue  p-4 mb-2 mt-2 rounded-lg gap-[10px] max-sm:w-[230px]"
      onClick={() => onClick({ name, startDate, deadline, status })}
    >
      <h4 className="font-semibold text-base leading-6">{name}</h4>
      <div className="flex gap-6 mt-4">
        <div>
          <h4 className="text-xs leading-5 text-[#777777]">Start date</h4>
          <p
            className="text-sm px-2 py-1 rounded-md mt-1"
            style={{ color: textColor, backgroundColor: bgColor }}
          >
            {format_Date(startDate)}
          </p>
        </div>
        <div>
          <h4 className="text-xs leading-5 text-[#777777]">Deadline</h4>
          <p
            className="text-sm bg-[#EBEEFC] px-2 py-1 rounded-md mt-1"
            style={{ color: textColor, backgroundColor: bgColor }}
          >
            {format_Date(deadline)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Taskcard;
