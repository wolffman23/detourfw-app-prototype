# Detour FW app prototype

A **prototype** of a phone app for [Detour FW](https://detourfw.com), the Fort Wayne & Allen County traffic and road-closure tracker. It's here so a few people can try it and give feedback. It isn't the finished app.

**Open it:** https://wolffman23.github.io/detourfw-app-prototype/ (on a phone, use "Add to Home Screen" to install it).

> ⚠️ **Not for emergencies.** In an emergency, call 911. Information can be incomplete or delayed. Always follow posted signs and officers on scene.

- **Data:** live from the public feed at https://detourfw.com/api/disruptions. Detour FW gathers it from the City of Fort Wayne (TREC), INDOT 511IN, the Allen County Sheriff, Citilink, event calendars (Memorial Coliseum, PFW athletics, Visit Fort Wayne), the National Weather Service, and local news. Each item credits its source in the app.
- **Map:** © OpenStreetMap contributors.
- **What's in it:** Now / Soon / Ongoing list, a full-screen map with a **text-list view**, filters, item details with Open in Waze / Google Maps, and "Updated X min ago" plus the source on every item.
- **My commute:** save roads and areas. They're stored only on your phone, and the app shows what's on them right now. Free commute **alerts are coming**; the "Enable alerts" switch is a preview and doesn't send or request anything.
- **Accessibility:** labeled controls and map pins for screen readers, visible focus, and a text list as well as the map. It's checked with axe-core.
- **Prototype only:** the "Still there / Cleared" votes, the report form, the newsletter box and the alert switches don't send anything. There are no ads, no analytics and no accounts.

This repo contains only the built static files.
