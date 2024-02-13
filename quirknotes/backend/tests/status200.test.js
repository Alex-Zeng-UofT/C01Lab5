

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  const deleteEverything = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  })
  expect(deleteEverything.status).toBe(200)

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)

  const body = await notes.json()

  expect(notes.status).toBe(200);
  expect(body.response).toStrictEqual([])
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  const deleteEverything = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  })
  expect(deleteEverything.status).toBe(200)

  const t1 = "foo"
  const c1 = "first"
  const t2 = "bar"
  const c2 = "second"

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1,
    }),
  });
  const postNoteBody1 = await postNoteRes1.json();
  expect(postNoteRes1.status).toBe(200);
  expect(postNoteBody1.response).toBe("Note added succesfully.");

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t2,
      content: c2,
    }),
  });
  const postNoteBody2 = await postNoteRes2.json();
  expect(postNoteRes2.status).toBe(200);
  expect(postNoteBody2.response).toBe("Note added succesfully.");

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)

  const body = await notes.json()

  expect(notes.status).toBe(200);
  expect(body.response.length).toBe(2)
  expect(body.response[0].title).toBe(t1)
  expect(body.response[0].content).toBe(c1)
  expect(body.response[1].title).toBe(t2)
  expect(body.response[1].content).toBe(c2)
});

test("/deleteNote - Delete a note", async () => {
  // Code here

  const t1 = "foo"
  const c1 = "first"

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)
  const body = await notes.json()
  expect(notes.status).toBe(200);

  const len = body.response.length - 1
  const id = body.response[len]._id

  const deleteOne = await fetch(`${SERVER_URL}/deleteNote/${id}`, {
    method: "DELETE",
  })

  const dBody = await deleteOne.json()

  expect(deleteOne.status).toBe(200)
  expect(dBody.response).toBe(`Document with ID ${id} deleted.`)

  const after = await fetch(`${SERVER_URL}/getAllNotes`)
  const afterBody = await after.json()
  expect(after.status).toBe(200);

  expect(afterBody.response.length).toBe(len);
  
  let exists = false
  for (let res in afterBody.response) {
    if (res._id == id)
      exists = true
  }

  expect(exists).toBe(false)
});

test("/patchNote - Patch with content and title", async () => {
  // Code here

  const t1 = "foo"
  const c1 = "first"

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)
  const body = await notes.json()
  expect(notes.status).toBe(200);

  const len = body.response.length - 1
  const id = body.response[len]._id

  const t2 = "bar"
  const c2 = "newly patched"

  const patchNote = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t2,
      content: c2
    })
  })
  expect(patchNote.status).toBe(200)

  patchBody = await patchNote.json()
  expect(patchBody.response).toBe(`Document with ID ${id} patched.`)

  const after = await fetch(`${SERVER_URL}/getAllNotes`)
  const afterBody = await after.json()
  expect(after.status).toBe(200);
  expect(afterBody.response[len].title).toBe(t2);
  expect(afterBody.response[len].content).toBe(c2);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const t1 = "foo"
  const c1 = "lol"

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1
    }),
  });
  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)
  const body = await notes.json()
  expect(notes.status).toBe(200);

  const len = body.response.length - 1
  const id = body.response[len]._id

  const t2 = "bar"

  const patchNote = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t2,
    })
  })
  expect(patchNote.status).toBe(200)

  patchBody = await patchNote.json()
  expect(patchBody.response).toBe(`Document with ID ${id} patched.`)

  const after = await fetch(`${SERVER_URL}/getAllNotes`)
  const afterBody = await after.json()
  expect(after.status).toBe(200);
  expect(afterBody.response[len].title).toBe(t2);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const t1 = "foo"
  const c1 = "lol"

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1
    }),
  });
  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)
  const body = await notes.json()
  expect(notes.status).toBe(200);

  const len = body.response.length - 1
  const id = body.response[len]._id

  const c2 = "bar"

  const patchNote = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: c2,
    })
  })
  expect(patchNote.status).toBe(200)

  patchBody = await patchNote.json()
  expect(patchBody.response).toBe(`Document with ID ${id} patched.`)

  const after = await fetch(`${SERVER_URL}/getAllNotes`)
  const afterBody = await after.json()
  expect(after.status).toBe(200);
  expect(afterBody.response[len].content).toBe(c2);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)
  const body = await notes.json()
  expect(notes.status).toBe(200);

  const num = body.response.length

  const deleteEverything = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  })
  expect(deleteEverything.status).toBe(200)
  deleteAllBody = await deleteEverything.json()
  expect(deleteAllBody.response).toBe(`${num} note(s) deleted.`)
  
  const t1 = "foo"
  const c1 = "lol"

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1
    }),
  });
  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteEverythingOne = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  })
  expect(deleteEverythingOne.status).toBe(200)
  deleteAllOneBody = await deleteEverythingOne.json()
  expect(deleteAllOneBody.response).toBe(`1 note(s) deleted.`)
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)
  const body = await notes.json()
  expect(notes.status).toBe(200);

  const num = body.response.length

  const deleteEverything = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  })
  expect(deleteEverything.status).toBe(200)
  deleteAllBody = await deleteEverything.json()
  expect(deleteAllBody.response).toBe(`${num} note(s) deleted.`)
  
  const t1 = "foo"
  const c1 = "lol"
  const t2 = "foo"
  const c2 = "lol"
  const t3 = "foo"
  const c3 = "lol"

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1
    }),
  });
  const postNoteBody1 = await postNoteRes1.json();
  expect(postNoteRes1.status).toBe(200);
  expect(postNoteBody1.response).toBe("Note added succesfully.");

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1
    }),
  });
  const postNoteBody2 = await postNoteRes2.json();
  expect(postNoteRes2.status).toBe(200);
  expect(postNoteBody2.response).toBe("Note added succesfully.");

  const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1
    }),
  });
  const postNoteBody3 = await postNoteRes3.json();
  expect(postNoteRes3.status).toBe(200);
  expect(postNoteBody3.response).toBe("Note added succesfully.");

  const deleteEverythingOne = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  })
  expect(deleteEverythingOne.status).toBe(200)
  deleteAllOneBody = await deleteEverythingOne.json()
  expect(deleteAllOneBody.response).toBe(`3 note(s) deleted.`)
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const t1 = "foo"
  const c1 = "lol"

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: t1,
      content: c1
    }),
  });
  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const notes = await fetch(`${SERVER_URL}/getAllNotes`)
  const body = await notes.json()
  expect(notes.status).toBe(200);

  const len = body.response.length - 1
  const id = body.response[len]._id

  const patchNote = await fetch(`${SERVER_URL}/updateNoteColor/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "#FF0000",
    })
  })
  expect(patchNote.status).toBe(200)

  patchColorBody = await patchNote.json()
  expect(patchColorBody.message).toBe('Note color updated successfully.')

  const afterNotes = await fetch(`${SERVER_URL}/getAllNotes`)
  const afterBody = await afterNotes.json()
  expect(afterNotes.status).toBe(200);
  expect(afterBody.response[len].color).toBe("#FF0000")
});