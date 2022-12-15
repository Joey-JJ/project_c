import TicketCount from "../components/TicketCount";
import { useSessionContext } from "../context/sessionContext";

const AccountInfo = () => {
  const { session } = useSessionContext();

  return (
    <div>
      <div className="container mx-auto min-h-screen flex flex-col mt-8 items-center">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-20 mb-8">
            <span className="text-3xl">J</span>
          </div>
        </div>
        <div className="stats shadow stats-vertical">
          <div className="stat">
            <div className="stat-title">Name</div>
            <div className="stat-value text-sm">John Doe</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Email</div>
            <div className="stat-value text-sm">{session?.user.email}</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Card number</div>
            <div className="stat-value text-sm">XX-XXX-XX-XXXXXX</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">License number</div>
            <div className="stat-value text-sm">XX-XXX-XX</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
          {/* <TicketCount /> */}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
