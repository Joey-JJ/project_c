//send notification
export function sendNotification(title: string, body: string) {
    const options = {
      body: body,
      tag: "new-message",
    };
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
    };
  }