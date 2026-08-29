import { preview } from "vite";

export default async function globalSetup() {
  const server = await preview({
    plugins: [
      {
        name: "preview-clean-routes",
        configurePreviewServer(server) {
          server.middlewares.use((request, _response, next) => {
            const cleanRouteRequest = request as typeof request & {
              url?: string;
            };
            const pathname = cleanRouteRequest.url?.split("?", 1)[0];
            if (
              pathname &&
              pathname !== "/" &&
              !pathname.endsWith("/") &&
              !pathname.includes(".")
            ) {
              cleanRouteRequest.url = `${pathname}/index.html`;
            }
            next();
          });
        },
      },
    ],
    preview: {
      host: "127.0.0.1",
      port: 4321,
      strictPort: true,
    },
  });

  return async () => {
    await server.close();
  };
}
