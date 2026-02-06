// // // intializing Supbase Client
// // import { supaUrl, supaAnonKey } from "./configuration/config.js";
// // const { createClient } = supabase;

// // const supaClient = createClient(supaUrl, supaAnonKey);

// // // html elements

// // const loginButton = document.getElementById("signInBtn");
// // const logoutButton = document.getElementById("signOutBtn");
// // const whenSignedIn = document.getElementById("whenSignedIn");
// // const whenSignedOut = document.getElementById("whenSignedOut");
// // const userDetails = document.getElementById("userDetails");
// // const myThingsSection = document.getElementById("myThings");
// // const myThingsList = document.getElementById("myThingsList");
// // const allThingsSection = document.getElementById("allThings");
// // const allThingsList = document.getElementById("allThingsList");
// // const createThing = document.getElementById("createThing");

// // //* Event Listeners

// // loginButton.addEventListener("click", () => {
// //   supaClient.auth.signInWithOAuth({
// //     provider: "google",
// //     //*
// //     options: {
// //       redirectTo: window.location.origin,
// //     },
// //   });
// // });

// // createThing.addEventListener("click", async () => {
// //   // const {
// //   //   data: { user },
// //   // } = await supaClient.auth.getUser();
// //   // const thing = createRandomThing(user);
// //   // await supaClient.from("things").insert([thing]);

// //   const {
// //     data: { user },
// //   } = await supaClient.auth.getUser();

// //   const thing = createRandomThing(user);

// //   const { data, error } = await supaClient
// //     .from("things")
// //     .insert([thing])
// //     .select(); // get the inserted row with id

// //   if (error) {
// //     console.error(error);
// //     return;
// //   }

// //   // Optimistic UI update
// //   myThings[data[0].id] = data[0];
// //   allThings[data[0].id] = data[0];
// //   renderMyThings();
// //   renderAllThings();
// // });

// // logoutButton.addEventListener("click", () => {
// //   supaClient.auth.signOut();
// // });

// // //* Init

// // initAllThings(); // this will fetch first, render, then subscribe

// // checkUserOnStartUp();

// // let myThingsSubscription;
// // const myThings = {};
// // const allThings = {};

// // getAllIntialThings().then(() => listenToAllThings());

// // await fetchAllThings(); // fetch current state
// // subscribeAllThings(); // listen for future changes

// // supaClient.auth.onAuthStateChange((_event, session) => {
// //   if (session?.user) {
// //     adjustForUser(session.user);
// //   } else {
// //     adjustForNoUser();
// //   }
// // });

// // //* Function Declarartions

// // async function fetchAllThings() {
// //   const { data } = await supaClient.from("things").select();
// //   // allThings = {}; // clear old data
// //   data.forEach((thing) => (allThings[thing.id] = thing));
// //   renderAllThings();
// // }

// // function subscribeAllThings() {
// //   supaClient
// //     .channel("public:things")
// //     .on(
// //       "postgres_changes",
// //       { event: "INSERT", schema: "public", table: "things" },
// //       (payload) => {
// //         allThings[payload.new.id] = payload.new;
// //         renderAllThings();
// //       }
// //     )
// //     .on(
// //       "postgres_changes",
// //       { event: "UPDATE", schema: "public", table: "things" },
// //       (payload) => {
// //         allThings[payload.new.id] = payload.new;
// //         renderAllThings();
// //       }
// //     )
// //     .on(
// //       "postgres_changes",
// //       { event: "DELETE", schema: "public", table: "things" },
// //       (payload) => {
// //         delete allThings[payload.old.id];
// //         renderAllThings();
// //       }
// //     )
// //     .subscribe();
// // }

// // // Fetch initial data AND subscribe to real-time updates
// // async function initAllThings() {
// //   // const { data } = await supaClient.from("things").select();
// //   // data.forEach((thing) => (allThings[thing.id] = thing));
// //   // renderAllThings();

// //   // listenToAllThings(); // subscribe AFTER fetching initial data
// //   // 1️⃣ Fetch existing things
// //   const { data, error } = await supaClient.from("things").select();
// //   if (error) {
// //     console.error("Error fetching things:", error);
// //     return;
// //   }

// //   data.forEach((thing) => (allThings[thing.id] = thing));
// //   renderAllThings();

// //   // 2️⃣ Subscribe to real-time changes
// //   supaClient
// //     .channel("public:things")
// //     // INSERT
// //     .on(
// //       "postgres_changes",
// //       { event: "INSERT", schema: "public", table: "things" },
// //       (payload) => {
// //         allThings[payload.new.id] = payload.new;
// //         renderAllThings();
// //       }
// //     )
// //     // UPDATE
// //     .on(
// //       "postgres_changes",
// //       { event: "UPDATE", schema: "public", table: "things" },
// //       (payload) => {
// //         allThings[payload.new.id] = payload.new;
// //         renderAllThings();
// //       }
// //     )
// //     // DELETE
// //     .on(
// //       "postgres_changes",
// //       { event: "DELETE", schema: "public", table: "things" },
// //       (payload) => {
// //         delete allThings[payload.old.id];
// //         renderAllThings();
// //       }
// //     )
// //     .subscribe();
// // }

// // async function checkUserOnStartUp() {
// //   const {
// //     data: { user },
// //   } = await supaClient.auth.getUser();
// //   if (user) {
// //     adjustForUser(user);
// //   } else {
// //     adjustForNoUser();
// //   }
// // }

// // async function adjustForUser(user) {
// //   whenSignedIn.hidden = false;
// //   whenSignedOut.hidden = true;
// //   myThingsSection.hidden = false;
// //   // userDetails.innerHTML = `
// //   // <div>
// //   // <h5>${user.user_metadata.full_name}</h5>
// //   // <img src="${user.user_metadata.avatar_url}" alt="Avatar"/>
// //   //         <small class="text-muted">UID: ${user.id}</small>
// //   //         </div>
// //   // `;
// //   userDetails.innerHTML = `
// //   <h3>${user.user_metadata.full_name}</h3>
// //   <img src="${user.user_metadata.avatar_url}"/>
// //   <p>UID: ${user.id}</p>
// //   `;

// //   await getMyInitialThings(user);
// //   listenToMyThingsChanges(user);
// // }

// // function adjustForNoUser() {
// //   whenSignedIn.hidden = true;
// //   whenSignedOut.hidden = false;
// //   myThingsSection.hidden = true;
// //   if (myThingsSubscription) {
// //     myThingsSubscription.unsubscribe();
// //     myThingsSubscription = null;
// //   }
// // }

// // async function getAllIntialThings() {
// //   const { data } = await supaClient.from("things").select();
// //   for (const thing of data) {
// //     allThings[thing.id] = thing;
// //   }
// //   renderAllThings();
// // }

// // function renderAllThings() {
// //   const tableHeader = `<thead>
// //   <tr>
// //   <th>Name</th>
// //   <th>Weight</th>
// //   </tr>
// //   </thead>`;
// //   const tableBody = Object.values(allThings)
// //     .sort((a, b) => (a.weight > b.weight ? -1 : 1))
// //     .map((thing) => {
// //       return `<tr>
// //     <td>${thing.name}</td>
// //     <td>${thing.weight}</td>
// //     </tr>`;
// //     })
// //     .join("");

// //   const table = `
// //   <table class="table table-striped">
// //   ${tableHeader}
// //   <tbody>${tableBody}</tbody>
// //   </table>`;
// //   allThingsList.innerHTML = table;
// // }

// // function createRandomThing(user) {
// //   if (!user) {
// //     console.error("Must be signed in to create a thing");
// //     return;
// //   }
// //   return {
// //     // name: faker.commerce.productName(3),
// //     name: faker.commerce.productName(),
// //     weight: Math.round(Math.random() * 100),
// //     owner: user.id,
// //   };
// // }

// // function handleAllThingsUpdate(update) {
// //   if (update.eventType === "DELETE") {
// //     delete allThings[update.old.id];
// //   } else {
// //     allThings[update.new.id] = update.new;
// //   }
// //   renderAllThings();
// // }

// // function listenToAllThings() {
// //   // supaClient
// //   //   .channel("public:things")
// //   //   .on(
// //   //     "postgres_changes",
// //   //     {
// //   //       event: "*",
// //   //       schema: "public",
// //   //       table: "things",
// //   //     },
// //   //     handleAllThingsUpdate
// //   //   )
// //   //   .subscribe();
// //   supaClient
// //     .channel("public:things")
// //     .on(
// //       "postgres_changes",
// //       { event: "INSERT", schema: "public", table: "things" },
// //       (payload) => {
// //         allThings[payload.new.id] = payload.new;
// //         renderAllThings();
// //       }
// //     )
// //     .on(
// //       "postgres_changes",
// //       { event: "UPDATE", schema: "public", table: "things" },
// //       (payload) => {
// //         allThings[payload.new.id] = payload.new;
// //         renderAllThings();
// //       }
// //     )
// //     .on(
// //       "postgres_changes",
// //       { event: "DELETE", schema: "public", table: "things" },
// //       (payload) => {
// //         delete allThings[payload.old.id];
// //         renderAllThings();
// //       }
// //     )
// //     .subscribe();
// // }

// // async function getMyInitialThings(user) {
// //   const { data } = await supaClient
// //     .from("things")
// //     .select("*")
// //     .eq("owner", user.id);

// //   for (const thing of data) {
// //     myThings[thing.id] = thing;
// //   }
// //   renderMyThings();
// // }

// // function handleMyThingsUpdate(update) {
// //   if (update.eventType === "DELETE") {
// //     delete myThings[update.old.id];
// //   } else {
// //     myThings[update.new.id] = update.new;
// //   }
// //   renderMyThings();
// // }

// // async function listenToMyThingsChanges(user) {
// //   if (myThingsSubscription) {
// //     return;
// //   }
// //   // myThingsSubscription = supaClient
// //   //   .channel(`public:things:owner=eq.${user.id}`)
// //   //   .on(
// //   //     "postgres_changes",
// //   //     {
// //   //       event: "*",
// //   //       schema: "public",
// //   //       table: "things",
// //   //       filter: `owner=eq.${user.id}`,
// //   //     },
// //   //     handleMyThingsUpdate
// //   //   )
// //   //   .subscribe();
// //   myThingsSubscription = supaClient
// //     .channel(`public:things:owner=eq.${user.id}`)
// //     .on(
// //       "postgres_changes",
// //       {
// //         event: "INSERT", // listen for new rows
// //         schema: "public",
// //         table: "things",
// //         filter: `owner=eq.${user.id}`,
// //       },
// //       (payload) => {
// //         myThings[payload.new.id] = payload.new;
// //         renderMyThings();
// //       }
// //     )
// //     .on(
// //       "postgres_changes",
// //       {
// //         event: "UPDATE",
// //         schema: "public",
// //         table: "things",
// //         filter: `owner=eq.${user.id}`,
// //       },
// //       (payload) => {
// //         myThings[payload.new.id] = payload.new;
// //         renderMyThings();
// //       }
// //     )
// //     .on(
// //       "postgres_changes",
// //       {
// //         event: "DELETE",
// //         schema: "public",
// //         table: "things",
// //         filter: `owner=eq.${user.id}`,
// //       },
// //       (payload) => {
// //         delete myThings[payload.old.id];
// //         renderMyThings();
// //       }
// //     )
// //     .subscribe();
// // }
// // function renderMyThings() {
// //   const tableHeader = `<thead>
// //   <tr>
// //   <th>Name</th>
// //   <th>Weight</th>
// //   <th></th>
// //   </tr>
// //   </thead>`;
// //   const tableContents = Object.values(myThings)
// //     .sort((a, b) => (a.weight > b.weight ? -1 : 1))
// //     .map((thing) => {
// //       console.log(thing);
// //       return `<tr>
// //     <td>${thing.name}</td>
// //     <td>${thing.weight}</td>
// //     <td>${deleteButtonTemplate(thing)}</td>
// //     </tr>`;
// //     })
// //     .join("");
// //   const table = `<table class="table table-striped">
// // ${tableHeader}
// // <tbody>${tableContents}</tbody>
// //   </table>`;
// //   myThingsList.innerHTML = table;
// // }

// // function deleteButtonTemplate(thing) {
// //   return `<button onclick="deleteAtId(${thing.id})" class="btn btn-outline-danger">
// //   ${trashIcon}</button>`;
// // }

// // async function deleteAtId(id) {
// //   // optimistic UI remove
// //   delete myThings[id];
// //   delete allThings[id];
// //   renderMyThings();
// //   renderAllThings();

// //   // actual DB delete
// //   await supaClient.from("things").delete().eq("id", id);
// // }

// // // 👇 Add this right after the function
// // window.deleteAtId = deleteAtId;

// // const trashIcon = `
// // <svg xmlns="http://www.w3.org/2000/svg"
// //      width="24" height="24"
// //      viewBox="0 0 24 24"
// //      fill="none"
// //      stroke="currentColor"
// //      stroke-width="2"
// //      stroke-linecap="round"
// //      stroke-linejoin="round">
// //   <path d="M3 6h18"/>
// //   <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
// //   <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
// //   <line x1="10" y1="11" x2="10" y2="17"/>
// //   <line x1="14" y1="11" x2="14" y2="17"/>
// // </svg>`;
// //*-----------------------------------------------
// -----------------------------
// Supabase Client Initialization
// -----------------------------
import { supaUrl, supaAnonKey } from "./configuration/config.js";
const { createClient } = supabase;
const supaClient = createClient(supaUrl, supaAnonKey);

// -----------------------------
// DOM Elements
// -----------------------------
const loginButton = document.getElementById("signInBtn");
const logoutButton = document.getElementById("signOutBtn");
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const userDetails = document.getElementById("userDetails");
const myThingsSection = document.getElementById("myThings");
const myThingsList = document.getElementById("myThingsList");
const allThingsList = document.getElementById("allThingsList");
const createThing = document.getElementById("createThing");

// -----------------------------
// Global State
// -----------------------------
let myThingsSubscription;
const myThings = {};
const allThings = {};

// -----------------------------
// Event Listeners
// -----------------------------
loginButton.addEventListener("click", () => {
  supaClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin },
  });
});

logoutButton.addEventListener("click", () => {
  supaClient.auth.signOut();
});

// Create a Thing
createThing.addEventListener("click", async () => {
  const {
    data: { user },
  } = await supaClient.auth.getUser();

  if (!user) return;

  const thing = {
    name: faker.commerce.productName(),
    weight: Math.round(Math.random() * 100),
    owner: user.id,
  };

  // Insert and get inserted row
  const { data, error } = await supaClient
    .from("things")
    .insert([thing])
    .select();

  if (error) {
    console.error(error);
    return;
  }

  // Optimistic UI update
  myThings[data[0].id] = data[0];
  allThings[data[0].id] = data[0];
  renderMyThings();
  renderAllThings();
});

// -----------------------------
// Main Initialization
// -----------------------------
async function main() {
  await fetchAllThings(); // fetch all current rows
  subscribeAllThings(); // listen for future updates
  checkUserOnStartUp(); // handle user session
}

main();

// -----------------------------
// Auth State Changes
// -----------------------------
supaClient.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    adjustForUser(session.user);
  } else {
    adjustForNoUser();
  }
});

// -----------------------------
// Functions
// -----------------------------

// --- Fetch All Things ---
async function fetchAllThings() {
  const { data, error } = await supaClient.from("things").select();
  if (error) return console.error(error);

  // Clear old state
  Object.keys(allThings).forEach((k) => delete allThings[k]);
  data.forEach((thing) => (allThings[thing.id] = thing));
  renderAllThings();
}

// --- Subscribe to All Things ---
function subscribeAllThings() {
  supaClient
    .channel("public:things")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "things" },
      (payload) => {
        allThings[payload.new.id] = payload.new;
        renderAllThings();
      }
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "things" },
      (payload) => {
        allThings[payload.new.id] = payload.new;
        renderAllThings();
      }
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "things" },
      (payload) => {
        delete allThings[payload.old.id];
        renderAllThings();
      }
    )
    .subscribe();
}

// --- Check User On Startup ---
async function checkUserOnStartUp() {
  const {
    data: { user },
  } = await supaClient.auth.getUser();

  if (user) {
    adjustForUser(user);
  } else {
    adjustForNoUser();
  }
}

// --- Adjust for Signed-in User ---
async function adjustForUser(user) {
  whenSignedIn.hidden = false;
  whenSignedOut.hidden = true;
  myThingsSection.hidden = false;

  userDetails.innerHTML = `
    <h3>${user.user_metadata.full_name}</h3>
    <img src="${user.user_metadata.avatar_url}" />
    <p>UID: ${user.id}</p>
  `;

  await getMyInitialThings(user);
  listenToMyThingsChanges(user);
}

// --- Adjust for Signed-out User ---
function adjustForNoUser() {
  whenSignedIn.hidden = true;
  whenSignedOut.hidden = false;
  myThingsSection.hidden = true;

  if (myThingsSubscription) {
    myThingsSubscription.unsubscribe();
    myThingsSubscription = null;
  }
}

// --- Fetch My Things ---
async function getMyInitialThings(user) {
  const { data } = await supaClient
    .from("things")
    .select("*")
    .eq("owner", user.id);
  Object.keys(myThings).forEach((k) => delete myThings[k]);
  data.forEach((thing) => (myThings[thing.id] = thing));
  renderMyThings();
}

// --- Listen to My Things Changes ---
async function listenToMyThingsChanges(user) {
  if (myThingsSubscription) return;

  myThingsSubscription = supaClient
    .channel(`public:things:owner=eq.${user.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "things",
        filter: `owner=eq.${user.id}`,
      },
      (payload) => {
        myThings[payload.new.id] = payload.new;
        renderMyThings();
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "things",
        filter: `owner=eq.${user.id}`,
      },
      (payload) => {
        myThings[payload.new.id] = payload.new;
        renderMyThings();
      }
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "things",
        filter: `owner=eq.${user.id}`,
      },
      (payload) => {
        delete myThings[payload.old.id];
        renderMyThings();
      }
    )
    .subscribe();
}

// --- Render All Things ---
function renderAllThings() {
  const tableHeader = `<thead><tr><th>Name</th><th>Weight</th></tr></thead>`;
  const tableBody = Object.values(allThings)
    .sort((a, b) => b.weight - a.weight)
    .map((t) => `<tr><td>${t.name}</td><td>${t.weight}</td></tr>`)
    .join("");
  allThingsList.innerHTML = `<table class="table table-striped">${tableHeader}<tbody>${tableBody}</tbody></table>`;
}

// --- Render My Things ---
function renderMyThings() {
  const tableHeader = `<thead><tr><th>Name</th><th>Weight</th><th></th></tr></thead>`;
  const tableBody = Object.values(myThings)
    .sort((a, b) => b.weight - a.weight)
    .map(
      (t) =>
        `<tr><td>${t.name}</td><td>${t.weight}</td><td>${deleteButtonTemplate(
          t
        )}</td></tr>`
    )
    .join("");
  myThingsList.innerHTML = `<table class="table table-striped">${tableHeader}<tbody>${tableBody}</tbody></table>`;
}

// --- Delete Thing ---
async function deleteAtId(id) {
  // Optimistic UI remove
  delete myThings[id];
  delete allThings[id];
  renderMyThings();
  renderAllThings();

  // DB delete
  await supaClient.from("things").delete().eq("id", id);
}
window.deleteAtId = deleteAtId;

// --- Delete Button Template ---
const trashIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 6h18"/>
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  <line x1="10" y1="11" x2="10" y2="17"/>
  <line x1="14" y1="11" x2="14" y2="17"/>
</svg>`;
function deleteButtonTemplate(thing) {
  return `<button onclick="deleteAtId(${thing.id})" class="btn btn-outline-danger">${trashIcon}</button>`;
}
//*---------------------------------------------------------------
