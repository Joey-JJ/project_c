//send notification
export function sendNotification(title: string, body: string) {
    const options = {
      body,
    };
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
    };
  }