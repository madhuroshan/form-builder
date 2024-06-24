import { Input } from "./ui/input";

export interface QuestionProps {
  id: number | string;
  type: string;
  questionText: string;
  options?: string[];
}

const Question = ({ type, questionText, options }: QuestionProps) => {
  return (
    <div className="flex flex-col gap-2 items-start justify-center p-2 bg-gray-400">
      <p className="text-sm">{questionText} </p>
      {type === "text" && <Input type="text" />}
      {type === "mcq" &&
        options?.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="radio" name="mcq" />
            <p>{option}</p>
          </div>
        ))}
    </div>
  );
};

export default Question;
