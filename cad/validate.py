from pathlib import Path
import json, trimesh, zipfile
root=Path(__file__).resolve().parents[1]/'dist/models'
results=[]
for path in sorted(root.glob('*.stl')):
    m=trimesh.load_mesh(path)
    result=dict(file=path.name,watertight=bool(m.is_watertight),winding_consistent=bool(m.is_winding_consistent),connected_solids=len(m.split()),dimensions_mm=m.extents.round(3).tolist(),volume_mm3=round(float(m.volume),3),triangles=len(m.faces))
    assert result['watertight'] and result['winding_consistent'] and result['connected_solids']==1 and m.volume>0,result
    results.append(result)
(root/'mesh-validation.json').write_text(json.dumps(results,indent=2)+'\n')
with zipfile.ZipFile(root/'nema17-press-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in sorted(root.iterdir()):
        if p.suffix in ['.stl','.scad','.txt','.json']:z.write(p,p.name)
print(json.dumps(results,indent=2))
