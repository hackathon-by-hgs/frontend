import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager'
import { useState } from 'react'

export function useNfc(){
  const [isWriting,setIsWriting] = useState<boolean>(false)
  const [isReading,setIsReading] = useState<boolean>(false)
  const [error,setError] = useState<string | null>(null)



  const write = async (token:string)=>{
      try{
        setIsWriting(true)
        await NfcManager.requestTechnology(NfcTech.Ndef)
        const bytes =Ndef.encodeMessage([Ndef.textRecord(token)])
        if(bytes){
          await NfcManager.ndefHandler.writeNdefMessage(bytes)
        }

      }catch(err){
        setError("Failed to write Nfc tag")
      }finally{
        setIsWriting(false)
        NfcManager.cancelTechnologyRequest()
      }
  }
  const read = async():Promise<string | undefined>=>{
    try{
      setIsReading(true)
      await NfcManager.requestTechnology(NfcTech.Ndef)
      const tag = await NfcManager.getTag()
      const ndefRecords =tag?.ndefMessage
      const tokenRecord =ndefRecords?.[0]
      const token = Ndef.text.decodePayload(tokenRecord?.payload as unknown as Uint8Array)
      if (!token) throw new Error('Could not decode NFC payload')
      return token
    }catch(err){
      setError("Could not read Nfc tag")
      return undefined
    }finally{
      setIsReading(false)
      NfcManager.cancelTechnologyRequest()
    }
  }
  return {
    write,
    read,
    isWriting,
    isReading,
    error
  }

}