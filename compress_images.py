import os
from PIL import Image

def compress_images(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, file)
                
                # output name
                name, ext = os.path.splitext(file)
                out_filepath = os.path.join(root, f"{name}.webp")
                
                # skip if webp already exists
                if os.path.exists(out_filepath):
                    continue
                    
                try:
                    with Image.open(filepath) as img:
                        # Convert to RGB if RGBA (for jpg compatibility, though webp supports RGBA)
                        if img.mode in ("RGBA", "P"):
                            pass # WebP supports alpha channel
                        
                        # Resize if too large
                        max_width = 1920
                        if img.width > max_width:
                            ratio = max_width / img.width
                            new_size = (max_width, int(img.height * ratio))
                            img = img.resize(new_size, Image.Resampling.LANCZOS)
                            
                        # Save as webp
                        img.save(out_filepath, "WEBP", quality=80, method=4)
                        print(f"Compressed {file} -> {name}.webp")
                except Exception as e:
                    print(f"Failed to compress {file}: {e}")

if __name__ == '__main__':
    compress_images(r"c:\Users\eduna\Pictures\Ockfam\images")
