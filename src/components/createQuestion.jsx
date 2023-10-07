import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";

const CreateQuestion = () => {
  return (
    <>
      <div className="p-4">
        <TrixEditor placeholder="test de trix" />
      </div>
    </>
  );
};
export default CreateQuestion;
