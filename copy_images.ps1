$src = "c:\Users\DELL\Downloads\fruico images"
$dst = "public\images\products"

if (!(Test-Path $dst)) {
    New-Item -ItemType Directory -Force -Path $dst
}

# Copy all files from the download folder with clean names
Copy-Item "$src\How to Freeze Strawberries.jfif" "$dst\fraises.jpg" -Force
Copy-Item "$src\Frozen Strawberry Texture _ Fresh Ideas for Dessert & Smoothie Design.jfif" "$dst\fraises-detail.jpg" -Force
Copy-Item "$src\Frozen raspberries??.jfif" "$dst\framboises.jpg" -Force
Copy-Item "$src\How to Freeze Blueberries for Nearly a Year.jfif" "$dst\myrtilles.jpg" -Force
Copy-Item "$src\Delicious frozen blackberries.jfif" "$dst\mures.jpg" -Force
Copy-Item "$src\Frozen Diced Mango Pieces in a Close-Up View, Showing Frosted Edges and Bright Orange Color.jfif" "$dst\mangue.jpg" -Force
Copy-Item "$src\Frozen Sliced Kiwi Fruit in a Close-Up View, Displaying Frosty Texture and Bright Green Flesh.jfif" "$dst\kiwi.jpg" -Force
Copy-Item "$src\Frozen Halved Apricots in a Close-Up View, Displaying Frosty Texture and Vibrant Orange Color.jfif" "$dst\abricots.jpg" -Force
Copy-Item "$src\How to Freeze & Peel Fresh Peaches.jfif" "$dst\peches.jpg" -Force
Copy-Item "$src\Cherry ??.jfif" "$dst\cerises.jpg" -Force
Copy-Item "$src\How to freeze papaya.jfif" "$dst\papaye.jpg" -Force
Copy-Item "$src\Sugared Cranberries.jfif" "$dst\canneberges.jpg" -Force
Copy-Item "$src\Frozen Fruit.jfif" "$dst\fruits-mix.jpg" -Force
Copy-Item "$src\Vegan Mango Lime Fro-Yo.jfif" "$dst\smoothie-tropical.jpg" -Force
Copy-Item "$src\Vegan banana ice cream - Lazy Cat Kitchen.jfif" "$dst\smoothie-vert.jpg" -Force
Copy-Item "$src\This moist plum cake recipe is the best..jfif" "$dst\prunes.jpg" -Force
Copy-Item "$src\440015826117517698.jfif" "$dst\ananas.jpg" -Force
Copy-Item "$src\177962622771674637.jfif" "$dst\passion.jpg" -Force

Get-ChildItem $dst | Select-Object Name, Length
