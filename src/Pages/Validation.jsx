import React, { useState } from "react";

const Validation = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [charactor, setcharactor] = useState(false);
  const handleSubmit = () => {
    if (password !== confirmPass) {
        setpasswordMatch(true)
      return alert("Password match");
    }else{
        if (password.length <= 8) {
            setcharactor(true)
          return alert("Must to be 8 cha");
        }
    }
   
  };
  return (
    <div className="p-20 max-w-md flex flex-col bg-slate-800">
      {passwordMatch && "Password not match"}
      {charactor && " must to br 8 charactor"}
      <label htmlFor="">email</label>
      <input onChange={(e) => setemail(e.target.value)} required type="text" />
      <label htmlFor="">password</label>
      <input
        onChange={(e) => setpassword(e.target.value)}
        type="text"
        name=""
        id=""
      />
      <label htmlFor="">confirm pass</label>
      <input onChange={(e) => setconfirmPass(e.target.value)} type="text" />
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-400  mt-4">
        Submit
      </button>
    </div>
  );
};

export default Validation;
