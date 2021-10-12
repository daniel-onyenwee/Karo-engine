interface AssetLoadData {
    type: "image"|"audio"|"font"
    path: string
}

interface AssetsLoadedData {
    type: "image"|"audio"|"font",
    data: HTMLImageElement|HTMLAudioElement|string
}

/**
 * 🛠 utility class to handle the loading of assets for the game
 */
export default class AssetsLoader {
    private assetsToLoad:Array<AssetLoadData> = Array<AssetLoadData>()

    private assetsLoaded:Map<string, AssetsLoadedData> = new Map<string, AssetsLoadedData>()

    private supportedImageFormat:Set<string> = new Set<string>([
        "apng", 
        "avif", 
        "gif", 
        "jpg", 
        "jpeg",
        "jfif",
        "pjpeg",
        "pjp",
        "png",
        "svg",
        "webp"
    ])

    private supportedAudioFormat:Set<string> = new Set<string>([
        "wav",
        "mp3",
        "mp4a",
        "mpga",
        "mp2",
        "mp2a",
        "m2a",
        "m3a",
        "oga",
        "ogg",
        "spx",
        "opus",
        "aac",
        "weba",
        "caf",
        "flac"
    ])

    private supportedFontFormat:Set<string> = new Set<string>([
        "ttf",
        "woff",
        "otf",
        "woff2"
    ])

    /**
     * public method to load a list of assets
     * @param assets list of assets to load
     */
    public load(...assets:Array<string>): void {
        assets.forEach(path => {
            let extension:string|undefined = path.split(".").pop()
            if (extension != undefined) {
                extension = extension.toLowerCase()
                if (this.supportedImageFormat.has(extension)) 
                    this.assetsToLoad.push({
                        type: "image",
                        path: path
                    })
                else if (this.supportedAudioFormat.has(extension))
                    this.assetsToLoad.push({
                        type: "audio",
                        path: path
                    })
                else if (this.supportedFontFormat.has(extension))
                    this.assetsToLoad.push({
                        type: "font",
                        path: path
                    })
                else
                    console.error("Asset format is not supported")
                
            } else {
                console.error("Asset need to have an extension name")
            }
        })
    }

    /**
     * public method to load an audio asset
     * @param audioAssetData Javascript object containing the audio asset data to load 
     */
    public loadAudio(audioAssetData:AssetLoadData): void {
        if (audioAssetData.type == "audio") {
            let audio:HTMLAudioElement = new Audio(audioAssetData.path)
            audio.onloadeddata = () => {
                this.assetsLoaded.set(audio.src.replace(audio.baseURI, ""), {
                    type: "audio",
                    data: audio
                })
            }
            audio.onerror = () => {
                console.error(`Failed to load audio asset from '${audioAssetData.path}'`)
            }
        }
    }

    /**
     * public method to load an image asset
     * @param imageAssetData Javascript object containing the image asset data to load 
     */
    private loadImage(imageAssetData:AssetLoadData): void {
        if (imageAssetData.type == "image") {
            let image:HTMLImageElement = new Image()
            image.src = imageAssetData.path
            image.onload = () => {
                this.assetsLoaded.set(image.src.replace(image.baseURI, ""), {
                    type: "image",
                    data: image
                })
            }
            image.onerror = () => {
                console.error(`Failed to load image asset from '${imageAssetData.path}'`)
            }
        } 
    }

    /**
     * public method to load a font asset
     * @param fontAssetData Javascript object containing the font asset data to load 
     */
    private loadFont(fontAssetData:AssetLoadData): void {
        let fontFace:any = Object(window)["FontFace"]
        let name:string = (fontAssetData.path.split("/").pop() as string).replace(/\..+/, "")
        let font = new fontFace(name, `url(${fontAssetData.path})`)
        font.load().then((loaded_face:any) => {
            Object(document)["fonts"].add(loaded_face)
            this.assetsLoaded.set(name, {
                type: "font",
                data: fontAssetData.path
            })
        }).catch(() => {
            console.error(`Failed to load font asset from '${fontAssetData.path}'`)
        })
    }

    /**
     * public method to delete a list of assets
     * @param assets list of assets to delete
     */
    public delete(...assets:Array<string>): void {
        assets.forEach(path => {
            this.assetsLoaded.delete(path)
        })
    }

    /**
     * public method to check if an asset exist
     * @param asset name of asset to check if exist
     * @returns if asset exist return `true` else return `false`
     */
    public check(asset:string): boolean {
        return this.assetsLoaded.has(asset)
    }

    /**
     * public method to get an assets
     * @param asset name of asset to get
     * @returns if asset exist return a Javascript object containing the asset data else return `null`
     */
    public asset(asset:string): AssetsLoadedData|null {
        if (this.assetsLoaded.has(asset))
            return (this.assetsLoaded.get(asset) as AssetsLoadedData)
        else
            return null
    }
    
    /**
     * public method to check if all the asset is looaded 
     */
    public async isAssetsLoaded(): Promise<void> {
        this.assetsToLoad.forEach(assetData => {
            if (assetData.type == "image")
                this.loadImage(assetData)
            else if (assetData.type == "audio")
                this.loadAudio(assetData)
            else if (assetData.type == "font")
                this.loadFont(assetData)
        })
        this.assetsToLoad.length = 0
    }
}