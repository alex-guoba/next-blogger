import { logger } from "@/lib/logger";

export async function register() {
  const asciiArt = `    _   __             __   ____   __                                
   / | / /___   _  __ / /_ / __ ) / /____   ____ _ ____ _ ___   _____
  /  |/ // _ \\ | |/_// __// __  |/ // __ \\ / __ \`// __ \`// _ \\ / ___/
 / /|  //  __/_>  < / /_ / /_/ // // /_/ // /_/ // /_/ //  __// /    
/_/ |_/ \\___//_/|_| \\__//_____//_/ \\____/ \\__, / \\__, / \\___//_/     
                                         /____/ /____/               
`;
  console.log(asciiArt);
  logger.info("Server started!");
}
