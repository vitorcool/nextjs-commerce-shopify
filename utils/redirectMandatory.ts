/*
* Redirect to hostname:port of MandatoryUrl
*
* don't redirect when:
*   - mandatoryUrl not defined
*   - current hostname:port === mandatory hostname:port
*
* required arguments: res,req, mandatoryUrl
*/

export interface redirectMandatoryArgs {
  res: any
  req: any
  mandatoryURL: string
}

export default function redirectMandatory({ res, req, mandatoryURL } :redirectMandatoryArgs)  {

  if(mandatoryURL){
    const mandatory = new URL(mandatoryURL)

    const aHostPort :string[] | undefined = req?.headers?.host?.split(":")
    if(!aHostPort) {
      return false; // request does not have valid header.host
    }
    const hostname = aHostPort[0] || ""
    const port =     aHostPort[1] || ""

    if(hostname+":"+port !== mandatory.hostname+":"+mandatory.port) {
      const currentURL =mandatory.protocol+"//"+req?.headers?.host+req?.url;

      // switch hostname
      const current = new URL(currentURL)

      // if hostname are not equal
      current.hostname = mandatory.hostname
      current.port = mandatory.port

      console.log("redirect to mandatory domain ",current.href)
      res.setHeader("location", current.href);
      res.statusCode = 302
      res.end()
    }
  }
  return false;
}
