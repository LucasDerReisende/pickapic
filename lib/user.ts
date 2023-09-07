export class User {
    name: string
    uuid: string
    uploadedImages: boolean

    constructor(name: string, uuid: string, uploadedImages: boolean) {
        this.name = name
        this.uuid = uuid
        this.uploadedImages = uploadedImages
    }
}