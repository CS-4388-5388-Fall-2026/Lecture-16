import * as gfx from 'gophergfx'

export class RobotArm extends gfx.Skeleton
{
    private showAxes: boolean;
    constructor()
    {
        super();
        this.showAxes = false;
    }

    public createGeometry(): void{
        

        this.children.forEach((child: gfx.Node3) => {
            if (child instanceof gfx.Bone)
            {
                this.createGeometryRecursive(child);
            }
        })
    }

    public createGeometryRecursive(bone: gfx.Bone): void
    {

            if (this.showAxes)
            {
                const axes = gfx.Geometry3Factory.createAxes(1);
                axes.lookAt(bone.direction);
                bone.add(axes);
            }    
            else if(bone.name == 'upperArm')
            {
                const axes = gfx.Geometry3Factory.createAxes(0.25);
                const armMesh = gfx.Geometry3Factory.createBox();

                const S = gfx.Matrix4.makeScale(new gfx.Vector3(0.05, bone.length, 0.05)); 
                const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
                const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
                
                const M = gfx.Matrix4.multiplyAll(R, T, S);

                armMesh.setLocalToParentMatrix(M, false);

                armMesh.material.setColor(new gfx.Color(0,1,0));

                bone.add(armMesh);
            }
            else if(bone.name == 'middleArm')
            {
                const axes = gfx.Geometry3Factory.createAxes(0.25);
                const armMesh = gfx.Geometry3Factory.createBox();

                const S = gfx.Matrix4.makeScale(new gfx.Vector3(0.05, bone.length, 0.05)); 
                const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
                const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
                
                const M = gfx.Matrix4.multiplyAll(R, T, S);

                armMesh.setLocalToParentMatrix(M, false);
                armMesh.material.setColor(new gfx.Color(0,0,1));
                bone.add(armMesh);
            }
            else if(bone.name == 'lowerArm')
            {
                const axes = gfx.Geometry3Factory.createAxes(0.25);
                const armMesh = gfx.Geometry3Factory.createBox();

                const S = gfx.Matrix4.makeScale(new gfx.Vector3(0.05, bone.length, 0.05)); 
                const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
                const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
                
                const M = gfx.Matrix4.multiplyAll(R, T, S);

                armMesh.setLocalToParentMatrix(M, false);
                armMesh.material.setColor(new gfx.Color(1,0,0));
                bone.add(armMesh);
            }



         bone.children.forEach((child: gfx.Node3) => {
            if (child instanceof gfx.Bone)
            {
                this.createGeometryRecursive(child);
            }
        })
    }

    public createHierarchy(): void
    {
        const upperArm = new gfx.Bone();
        upperArm.name = "upperArm";
        upperArm.direction.set(0.5,0.5,0);
        upperArm.direction.normalize();
        upperArm.length = 0.5;
        this.add(upperArm);

        const middleArm = new gfx.Bone();
        middleArm.name = "middleArm";
        middleArm.direction.set(1,0.25,0);
        middleArm.direction.normalize()
        middleArm.length = 0.5;

        middleArm.position.copy(upperArm.direction);
        middleArm.position.multiplyScalar(upperArm.length);

        upperArm.add(middleArm);

        const lowerArm = new gfx.Bone();
        lowerArm.name = "lowerArm";
        lowerArm.direction.set(0,1,0);
        lowerArm.direction.normalize();
        lowerArm.length = 0.5;

        lowerArm.position.copy(middleArm.direction);
        lowerArm.position.multiplyScalar(middleArm.length);

        middleArm.add(lowerArm);

    }

    public setJointRotation(name: string, rotation: gfx.Quaternion): void
    {
        this.children.forEach((child: gfx.Node3) => {
            if (child instanceof gfx.Bone)
            {
                this.setJointRotationRecursive(child, name, rotation);
            }
    });

    }

    public setJointRotationRecursive(bone: gfx.Bone, name: string, rotation: gfx.Quaternion): void
    {
        if (bone.name == name)
        {
            bone.rotation.copy(rotation);
        }
        else
        {
            bone.children.forEach((child: gfx.Node3) => {
                if (child instanceof gfx.Bone)
                {
                    this.setJointRotationRecursive(child, name, rotation);
                }
        });
    }
    }

}