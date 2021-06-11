import app from "./app"

const PORT = process.env.PORT || 5000
const ENVIRONMENT = process.env.NODE_ENV

app.listen(PORT, () => {
  console.log(`Server running in ${ENVIRONMENT} mode on port ${PORT}`)
})
