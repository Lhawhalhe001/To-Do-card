let $ = s => document.querySelector(s), s = {
  title: 'Finish landing page',
  desc: 'Fix spacing, update copy, review mobile layout, test CTA, and send final version to the team before launch.',
  priority: 'High',
  status: 'In Progress',
  due: new Date(Date.now() + 26 * 36e5).toISOString().slice(0, 16),
  open: false, edit: false
}, bak = {};

let title = $('#title'), desc = $('#desc'), priority = $('#priority'), status = $('#status'), due = $('#due'),
  remaining = $('#remaining'), check = $('#check'), statusControl = $('#statusControl'),
  overdue = $('#overdue'), bar = $('.bar'), collapse = $('#collapse'), toggle = $('#toggle'),
  editBtn = $('#editBtn'), saveBtn = $('#saveBtn'), cancelBtn = $('#cancelBtn'),
  view = $('#viewMode'), edit = $('#editMode'),
  editTitle = $('#editTitle'), editDesc = $('#editDesc'), editPriority = $('#editPriority'), editDue = $('#editDue'),
  card = $('.card');

function left() {
  if (s.status == 'Done') return 'Completed';
  let m = new Date(s.due) - new Date(), a = Math.abs(m), min = 6e4, hr = 36e5, day = 864e5;
  if (a < min) return 'Due now!';
  if (m > 0) return a >= day ? `Due in ${~~(a / day)} day${~~(a / day) > 1 ? 's' : ''}` : a >= hr ? `Due in ${~~(a / hr)} hour${~~(a / hr) > 1 ? 's' : ''}` : `Due in ${~~(a / min)} minute${~~(a / min) > 1 ? 's' : ''}`;
  return a >= day ? `Overdue by ${~~(a / day)} day${~~(a / day) > 1 ? 's' : ''}` : a >= hr ? `Overdue by ${~~(a / hr)} hour${~~(a / hr) > 1 ? 's' : ''}` : `Overdue by ${~~(a / min)} minute${~~(a / min) > 1 ? 's' : ''}`;
}

function paint() {
  let d = new Date(s.due), o = s.status != 'Done' && d < new Date(), long = s.desc.length > 120;
  title.textContent = s.title; desc.textContent = s.desc;
  priority.textContent = s.priority; status.textContent = s.status;
  due.textContent = 'Due ' + d.toLocaleString(); due.dateTime = d.toISOString();
  remaining.textContent = left(); check.checked = s.status == 'Done'; statusControl.value = s.status;
  overdue.classList.toggle('hide', !o); card.classList.toggle('over', o); card.classList.toggle('done', s.status == 'Done');
  priority.style.background = s.priority == 'High' ? '#fee2e2' : s.priority == 'Medium' ? '#fef3c7' : '#d1fae5';
  priority.style.color = s.priority == 'High' ? '#b91c1c' : s.priority == 'Medium' ? '#92400e' : '#065f46';
  status.style.background = s.status == 'Done' ? '#dcfce7' : s.status == 'In Progress' ? '#dbeafe' : '#e5e7eb';
  status.style.color = s.status == 'Done' ? '#166534' : s.status == 'In Progress' ? '#1d4ed8' : '#374151';
  bar.style.background = s.priority == 'High' ? '#ef4444' : s.priority == 'Medium' ? '#f59e0b' : '#10b981';
  toggle.classList.toggle('hide', !long); collapse.style.maxHeight = !long || s.open ? '999px' : '72px';
  toggle.textContent = s.open ? 'Show less' : 'Show more'; toggle.setAttribute('aria-expanded', s.open);
  view.classList.toggle('hide', s.edit); edit.classList.toggle('hide', !s.edit);
  editBtn.classList.toggle('hide', s.edit); saveBtn.classList.toggle('hide', !s.edit); cancelBtn.classList.toggle('hide', !s.edit);
}

editBtn.onclick = () => { bak = { ...s }; s.edit = true; editTitle.value = s.title; editDesc.value = s.desc; editPriority.value = s.priority; editDue.value = s.due; paint(); editTitle.focus(); }
saveBtn.onclick = () => { s.title = editTitle.value || s.title; s.desc = editDesc.value || s.desc; s.priority = editPriority.value; s.due = editDue.value || s.due; s.edit = false; paint(); editBtn.focus(); }
cancelBtn.onclick = () => { s = { ...bak, edit: false }; paint(); editBtn.focus(); }
check.onchange = () => { s.status = check.checked ? 'Done' : 'Pending'; paint(); }
statusControl.onchange = () => { s.status = statusControl.value; paint(); }
toggle.onclick = () => { s.open = !s.open; paint(); }
$('#delBtn').onclick = () => alert('Delete clicked');

paint();
setInterval(() => !s.edit && (remaining.textContent = left(), overdue.classList.toggle('hide', !(s.status != 'Done' && new Date(s.due) < new Date()))), 30000);