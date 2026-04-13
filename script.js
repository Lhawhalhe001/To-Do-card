let c = document.getElementById('check'),
    t = document.getElementById('title'),
    s = document.getElementById('status'),
    r = document.getElementById('remaining'),
    d = new Date(document.getElementById('due').dateTime);

function timeText(){
  let m = d - new Date(), min = 6e4, hr = 36e5, day = 864e5;
  if (Math.abs(m) < min) return 'Due now!';
  if (m > 0) {
    if (m >= day*2) return `Due in ${Math.floor(m/day)} days`;
    if (m >= day) return 'Due tomorrow';
    if (m >= hr) return `Due in ${Math.floor(m/hr)} hours`;
    return `Due in ${Math.floor(m/min)} minutes`;
  }
  m = Math.abs(m);
  if (m >= day) return `Overdue by ${Math.floor(m/day)} days`;
  if (m >= hr) return `Overdue by ${Math.floor(m/hr)} hours`;
  return `Overdue by ${Math.floor(m/min)} minutes`;
}

function update(){
  r.textContent = timeText();
  document.querySelector('.card').classList.toggle('done', c.checked);
  s.textContent = c.checked ? 'Done' : 'Pending';
}

c.onchange = update;
document.querySelector('[data-testid="test-todo-edit-button"]').onclick = () => console.log('edit clicked');
document.querySelector('[data-testid="test-todo-delete-button"]').onclick = () => alert('Delete clicked');

update();
setInterval(update, 60000);