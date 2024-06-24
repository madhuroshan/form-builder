"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Question, { QuestionProps } from "@/components/Question";

export default function Home() {
  const [forms, setForms] = useState<QuestionProps[] | []>([]);

  const [questionType, setQuestionType] = useState("text");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [questionText, setQuestionText] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="text-3xl flex items-center justify-center w-[500px] mx-auto">
      <div className="w-full">
        <form id="form" className="flex flex-col gap-2 p-2 ">
          {forms.map((form: QuestionProps) => (
            <Question
              type={form.type}
              id={form.id}
              key={form.id}
              questionText={form.questionText}
              options={form.options}
            />
          ))}
          {forms.length > 0 && <Button type="submit">Submit</Button>}
        </form>
        <div>
          <Dialog open={open}>
            <DialogTrigger
              className="flex items-center justify-center gap-2 p-2 bg-gray-800 text-white rounded-md"
              onClick={() => setOpen(!open)}
            >
              <Plus size={16} /> <p className="text-sm"> Add New Field</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new element</DialogTitle>
                <div className="flex flex-col gap-2 items-start">
                  <p>Enter Question</p>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setQuestionText(e.target.value);
                    }}
                  />

                  <p>Select Type</p>
                  <Select
                    defaultValue="text"
                    onValueChange={(value) => setQuestionType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="mcq">MCQ</SelectItem>
                    </SelectContent>
                  </Select>
                  {questionType === "mcq" && (
                    <div className="flex flex-col gap-2 items-start">
                      <p>Enter Options</p>
                      <Input
                        type="text"
                        onChange={(e) => {
                          setOptions([
                            e.target.value,
                            options[1],
                            options[2],
                            options[3],
                          ]);
                        }}
                      />
                      <Input
                        type="text"
                        onChange={(e) => {
                          setOptions([
                            options[0],
                            e.target.value,
                            options[2],
                            options[3],
                          ]);
                        }}
                      />
                      <Input
                        type="text"
                        onChange={(e) => {
                          setOptions([
                            options[0],
                            options[1],
                            e.target.value,
                            options[3],
                          ]);
                        }}
                      />
                      <Input
                        type="text"
                        onChange={(e) => {
                          setOptions([
                            options[0],
                            options[1],
                            options[2],
                            e.target.value,
                          ]);
                        }}
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  onClick={() => {
                    questionType === "mcq"
                      ? setForms([
                          ...forms,
                          {
                            id: forms.length + 1,
                            type: questionType,
                            questionText: questionText,
                            options: options,
                          },
                        ])
                      : setForms([
                          ...forms,
                          {
                            id: forms.length + 1,
                            type: questionType,
                            questionText: questionText,
                          },
                        ]);

                    setOpen(!open);
                    setQuestionText("");
                    setQuestionType("text");
                    setOptions(["", "", "", ""]);
                  }}
                >
                  Add
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
