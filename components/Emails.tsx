import React, { useState, useEffect } from "react";

const Emails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    try {
      fetch("api/getEmails")
        .then((res) => res.json())
        .then((data) => setEmails(data))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (err: any) {
      setError(true);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  let i = 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error, could not fetch emails</p>;

  return (
    <div className="max-w-xl overflow-scroll my-10 max-h-80">
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
