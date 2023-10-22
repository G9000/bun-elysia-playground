/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/lib/lucia.ts").Auth;
  type DatabaseUserAttributes = {};
  type DatabaseSessionAttributes = {};
}
