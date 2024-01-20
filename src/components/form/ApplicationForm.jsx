// components
import InputForm from "../input/InputForm"
import Button from "../button/Button"

const ApplicationForm = ({ handleChangeUserInfo, handleFileChange, sendApplicationFunction }) => {
  return (
    <>
      <div className="p-5 max-w-96 mx-auto">
        <h2 className="text-3xl font-bold">
          Candidatura da Rider
        </h2>
        <InputForm
          label={"Nome"}
          placeholder={"Scrivi il tuo nome"}
          className={"my-1"}
          onChange={(event) => handleChangeUserInfo("name", event.target.value)}
        />
        <InputForm
          label={"Cognome"}
          placeholder={"Scrivi il tuo cognome"}
          className={"my-1"}
          onChange={(event) => handleChangeUserInfo("lastname", event.target.value)}
        />
        <InputForm
          label={"Email"}
          placeholder={"Scrivi la tua e-mail"}
          type={"email"}
          className={"my-1"}
          onChange={(event) => handleChangeUserInfo("email", event.target.value)}
        />
        <input
          className="block w-full mt-4 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          type="file"
          onChange={(event) => handleFileChange(event.target.files[0])}
        />
        <Button
          onClick={() => sendApplicationFunction()}
          className={"btn btn-success mt-5 w-full text-white"}
        >
          Invia
        </Button>
      </div>
    </>
  )
}

export default ApplicationForm;
