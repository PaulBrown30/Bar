


const ErrorMessage = ({errori}: {errori: string[]}) => {
  return (<>
    {errori.map(errore =>
        <p 
            key={"*" + errore}
            className = "px-4 font-bold text-red-500 text-[12px]"
        >
            {"*" + errore}
        </p>
    )}
  </>
  )
}

export default ErrorMessage