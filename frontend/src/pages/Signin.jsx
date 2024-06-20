import React from 'react'
import Heading from '../components/Heading'

const Signin = () => {
  return (
    
<div class="bg-white">
  <div class="flex h-screen flex-col items-center justify-center">
    <div class="max-h-auto mx-auto max-w-xl">
      <div class="mb-8 space-y-3">
        <Heading label={"Sign Up"} />
        <p class="text-gray-500">Enter your email, and we'll send a code to your inbox. <br />No need for passwords -- like magic!</p>
      </div>
      <form class="w-full">
        <div class="mb-10 space-y-3">
          <div class="space-y-1">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
              <input class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="mail@example.com" name="email" />
            </div>
          </div>
          <button class="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">Login</button>
        </div>
      </form>
      <div class="text-center"> No account? <a class="text-blue-500" href="/signup">Create one</a> </div>
    </div>
  </div>
</div>
  )
}

export default Signin
