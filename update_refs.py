import os

def update_refs(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace extensions, but be careful not to replace things that shouldn't be
    content = content.replace('.jpeg', '.webp').replace('.jpg', '.webp').replace('.png', '.webp')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_refs(r"c:\Users\eduna\Pictures\Ockfam\index.html")
update_refs(r"c:\Users\eduna\Pictures\Ockfam\css\styles.css")
print("References updated.")
