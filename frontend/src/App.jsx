import React, { useEffect, useState } from "react";

const App = () => {
  const [ipvalue, setipvalue] = useState("");
  const [lists, setlists] = useState([]);
  const [editid, seteditid] = useState(null);

  const getdata = async () => {
    const response = await fetch("http://localhost:5000/");
    const result = await response.json();
    if (result.status == 200) {
      setlists(result.data);
      console.log(result.data)
    }
  };

  const postdata = async () => {
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ipvalue,
      }),
    });
    if (response.ok) {
      setipvalue("");
      getdata()
    }
  };

  const putdata = async (index) => {
    const response = await fetch(`http://localhost:5000/?index=${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ipvalue,
      }),
    });
    if (response.status == 200) {
      seteditid(null);
      getdata()
      
    }
  }

  const deletedata = async (index) => {
    await fetch(`http://localhost:5000/${index}`, {
      method: "DELETE",
    });
    getdata()
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <input
        value={ipvalue}
        onChange={(e) => {
          setipvalue(e.target.value);
        }}
        type="text"
      />
      {editid !== null ? (
        <button onClick={() => { putdata(editid) }}>Update</button>
      ) : (
        <button onClick={postdata}>Add</button>
      )}
      {lists.map((item) => {
        return (
          <li key={item._id}>
            {item.ipvalue} <button onClick={() => { seteditid(item._id); setipvalue(item.ipvalue) }}>Edit</button> <button onClick={() => { deletedata(item._id) }}>Delete</button>
          </li>
        );
      })}
    </>
  );
};

export default App;
