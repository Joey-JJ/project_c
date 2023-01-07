import React, { useState, useEffect } from "react";

const Emails: React.FC = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch("api/getEmails")
      .then((res) => res.json())
      .then((data) => setEmails(data))
      .catch((err) => console.log(err));
  }, []);
  let i = 0;

  return (
    <div className="max-w-xl overflow-scroll my-10">
      <table className="table table-compact">
        <thead>
          <tr>
            <th></th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email: any) => (
            <tr key={email.id}>
              <th>{++i}</th>
              <td>{email.snippet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Emails;
